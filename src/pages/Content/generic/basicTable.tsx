import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const MAX_WIDTH = 800 - 68 // after computing padding, margin, border size is reduced

type RowProps = {
  values: React.ReactNode[]
  maxWidth: number
}

const Row = ({ values, maxWidth }: RowProps) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {values.map((cellValue, i) => (
        <TableCell key={i} sx={{ wordWrap: 'break-word' }} style={{ maxWidth }}>
          {cellValue}
        </TableCell>
      ))}
    </TableRow>
  )
}

type HeaderProps = {
  headers: string[]
}

const Header = ({ headers }: HeaderProps) => {
  if (headers.length === 0) {
    throw new Error('must include at least 1 header')
  }
  const maxWidth = Math.floor(MAX_WIDTH / headers.length)
  return (
    <TableHead>
      <Row key="headers" values={headers} maxWidth={maxWidth} />
    </TableHead>
  )
}

type ContentProps = {
  rows: {
    [key: string]: React.ReactNode
  }[]
  order: string[]
}

const Contents = ({ rows, order }: ContentProps) => {
  const sort = (obj: { [key: string]: React.ReactNode }) =>
    order.map((key) => obj[key])
  const orderedRow = rows.map((row) => sort(row))
  const maxWidth = Math.floor(MAX_WIDTH / order.length)
  return (
    <>
      {orderedRow.map((row, i) => (
        <Row key={i} values={row} maxWidth={maxWidth} />
      ))}
    </>
  )
}

type BasicTableProps<
  T extends {
    [k: string]: React.ReactNode
  }
> = {
  rows: T[]
  headers: Extract<keyof T, string>[]
}

/**
 * FIXME: for some reason the type only works if
 * the interface it's implementing has been
 * written out explicitly e.g. `rows` freaks out
 * if something like corsMisconfigWarning[] is passed to it instead
 * of typing out an array of objects with the exact same keys and values
 * as corsMisconfigWarning
 * @param param0
 * @returns
 */
export default function BasicTable<T extends { [k: string]: React.ReactNode }>({
  rows,
  headers,
}: BasicTableProps<T>) {
  return (
    <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
      <Table
        sx={{ minWidth: 650, maxWidth: MAX_WIDTH }}
        aria-label="simple table"
      >
        <Header headers={headers} />
        <TableBody>
          <Contents rows={rows} order={headers} />
        </TableBody>
      </Table>
    </TableContainer>
  )
}
