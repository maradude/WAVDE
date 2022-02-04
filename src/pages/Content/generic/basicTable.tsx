import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const MAX_WIDTH = 800 - 68 // after computing padding, margin, border size is reduced

const Row = ({
  values,
  maxWidth,
}: {
  values: React.ReactNode[]
  maxWidth: number
}) => {
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

const Header = ({ headers }: { headers: string[] }) => {
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

const Contents = ({
  rows,
  order,
}: {
  rows: { [key: string]: React.ReactNode }[]
  order: string[]
}) => {
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

export default function BasicTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: { [key: string]: React.ReactNode }[]
}) {
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
