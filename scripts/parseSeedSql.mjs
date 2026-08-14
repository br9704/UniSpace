/**
 * Minimal parser for the `INSERT INTO ... VALUES ...` statements in
 * `supabase/seed/*.sql`.
 *
 * The fixture layer exists so the app can be developed and verified without a
 * backend, but hand-written fixtures drift from the real data the moment either
 * side changes — and a fixture that disagrees with production is worse than no
 * fixture, because it makes broken things look fine. So the fixtures are
 * *derived* from the same SQL that seeds the database. There is one source of
 * truth for what the 18 buildings are.
 *
 * This handles only the subset of SQL the seed files actually use: explicit
 * column lists, single-quoted strings (including JSON containing commas and
 * brackets), numbers, booleans and NULL. It is not a general SQL parser and is
 * not trying to be — it fails loudly rather than guessing.
 */

/** Strip `--` line comments, leaving string literals untouched. */
function stripComments(sql) {
  let out = ''
  let inString = false

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i]

    if (inString) {
      out += ch
      // '' is an escaped quote inside a string, not a terminator.
      if (ch === "'" && sql[i + 1] === "'") {
        out += sql[++i]
      } else if (ch === "'") {
        inString = false
      }
      continue
    }

    if (ch === "'") {
      inString = true
      out += ch
      continue
    }

    if (ch === '-' && sql[i + 1] === '-') {
      while (i < sql.length && sql[i] !== '\n') i++
      out += '\n'
      continue
    }

    out += ch
  }

  return out
}

/**
 * Cut a VALUES body short at a trailing `ON CONFLICT` / `RETURNING` clause.
 *
 * The seeds are written to be re-runnable, so most statements end with
 * `ON CONFLICT (building_id, day_of_week, hour_of_day) DO UPDATE ...`. Those
 * parentheses sit at the same depth as the value rows and would otherwise be
 * read as one — a three-column row against a four-column list.
 */
function truncateAtTrailingClause(body) {
  let depth = 0
  let inString = false

  for (let i = 0; i < body.length; i++) {
    const ch = body[i]

    if (inString) {
      if (ch === "'" && body[i + 1] === "'") i++
      else if (ch === "'") inString = false
      continue
    }

    if (ch === "'") { inString = true; continue }
    if (ch === '(') { depth++; continue }
    if (ch === ')') { depth--; continue }

    if (depth === 0) {
      const rest = body.slice(i)
      if (/^ON\s+CONFLICT\b/i.test(rest) || /^RETURNING\b/i.test(rest)) {
        return body.slice(0, i)
      }
    }
  }

  return body
}

/** Split a `VALUES` body into its top-level parenthesised row groups. */
function splitRows(body) {
  const rows = []
  let depth = 0
  let current = ''
  let inString = false

  for (let i = 0; i < body.length; i++) {
    const ch = body[i]

    if (inString) {
      current += ch
      if (ch === "'" && body[i + 1] === "'") {
        current += body[++i]
      } else if (ch === "'") {
        inString = false
      }
      continue
    }

    if (ch === "'") {
      inString = true
      current += ch
      continue
    }

    if (ch === '(') {
      depth++
      if (depth === 1) {
        current = ''
        continue
      }
    } else if (ch === ')') {
      depth--
      if (depth === 0) {
        rows.push(current)
        continue
      }
    }

    if (depth > 0) current += ch
  }

  if (depth !== 0) throw new Error('Unbalanced parentheses in VALUES clause')
  return rows
}

/** Split one row's body on top-level commas. */
function splitFields(row) {
  const fields = []
  let depth = 0
  let current = ''
  let inString = false

  for (let i = 0; i < row.length; i++) {
    const ch = row[i]

    if (inString) {
      current += ch
      if (ch === "'" && row[i + 1] === "'") {
        current += row[++i]
      } else if (ch === "'") {
        inString = false
      }
      continue
    }

    if (ch === "'") {
      inString = true
      current += ch
      continue
    }

    if (ch === '(' || ch === '[') depth++
    else if (ch === ')' || ch === ']') depth--

    if (ch === ',' && depth === 0) {
      fields.push(current)
      current = ''
      continue
    }

    current += ch
  }

  fields.push(current)
  return fields
}

/** Convert one SQL literal into its JavaScript value. */
export function parseLiteral(raw) {
  const value = raw.trim()

  if (/^NULL$/i.test(value)) return null
  if (/^TRUE$/i.test(value)) return true
  if (/^FALSE$/i.test(value)) return false

  if (value.startsWith("'")) {
    if (!value.endsWith("'")) throw new Error(`Unterminated string literal: ${value.slice(0, 60)}`)
    const inner = value.slice(1, -1).replace(/''/g, "'")
    // Polygons are stored as JSON text; hand them back as objects so fixtures
    // match what PostgREST returns for a JSONB column.
    if (inner.startsWith('{') || inner.startsWith('[')) {
      try {
        return JSON.parse(inner)
      } catch {
        return inner
      }
    }
    return inner
  }

  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value)

  throw new Error(`Unrecognised SQL literal: ${value.slice(0, 60)}`)
}

/**
 * Extract every row inserted into `table` across the given SQL sources.
 *
 * Statements using `INSERT ... SELECT` (the zone_occupancy backfill) have no
 * VALUES clause and are skipped — the fixture layer derives those rows the same
 * way the SQL does.
 *
 * @returns {Array<Record<string, unknown>>}
 */
export function parseInserts(sql, table) {
  const clean = stripComments(sql)
  const pattern = new RegExp(
    `INSERT\\s+INTO\\s+${table}\\s*\\(([^)]*)\\)\\s*VALUES\\s*([\\s\\S]*?);`,
    'gi',
  )

  const rows = []
  for (const match of clean.matchAll(pattern)) {
    const columns = match[1].split(',').map((c) => c.trim())
    for (const rowBody of splitRows(truncateAtTrailingClause(match[2]))) {
      const fields = splitFields(rowBody)
      if (fields.length !== columns.length) {
        throw new Error(
          `${table}: row has ${fields.length} values for ${columns.length} columns.\n` +
            `  columns: ${columns.join(', ')}\n  row: ${rowBody.slice(0, 120)}`,
        )
      }
      const row = {}
      columns.forEach((col, i) => { row[col] = parseLiteral(fields[i]) })
      rows.push(row)
    }
  }

  return rows
}

/**
 * Apply `UPDATE buildings SET col = val, ... WHERE slug IN (...)` statements.
 *
 * Seeds 005 onward correct earlier rows rather than inserting new ones, and the
 * fixtures have to see the same final state the database will — otherwise local
 * development shows accessibility flags the deployed app does not have, which is
 * precisely the drift the generated-fixture approach exists to prevent.
 *
 * Only the narrow shape the seeds use is supported; anything else is ignored
 * rather than half-applied.
 */
export function applyUpdates(sql, rows, keyColumn = 'slug') {
  const clean = stripComments(sql)
  const pattern = /UPDATE\s+buildings\s+SET\s+([\s\S]*?)\s+WHERE\s+(\w+)\s+IN\s*\(([^)]*)\)\s*;/gi

  for (const match of clean.matchAll(pattern)) {
    const assignments = splitFields(match[1]).map((a) => {
      const [col, ...rest] = a.split('=')
      return [col.trim(), parseLiteral(rest.join('='))]
    })
    if (match[2].trim() !== keyColumn) continue

    const keys = new Set(
      splitFields(match[3]).map((v) => parseLiteral(v)).filter((v) => typeof v === 'string'),
    )

    for (const row of rows) {
      if (!keys.has(row[keyColumn])) continue
      for (const [col, value] of assignments) row[col] = value
    }
  }

  return rows
}

/** Apply `UPDATE buildings SET ... ;` with no WHERE clause — affects every row. */
export function applyGlobalUpdates(sql, rows) {
  const clean = stripComments(sql)
  const pattern = /UPDATE\s+buildings\s+SET\s+([\s\S]*?)\s*;/gi

  for (const match of clean.matchAll(pattern)) {
    if (/\bWHERE\b/i.test(match[0])) continue
    const assignments = splitFields(match[1]).map((a) => {
      const [col, ...rest] = a.split('=')
      return [col.trim(), parseLiteral(rest.join('='))]
    })
    for (const row of rows) {
      for (const [col, value] of assignments) row[col] = value
    }
  }

  return rows
}
