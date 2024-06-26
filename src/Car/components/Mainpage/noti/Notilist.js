import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import * as React from 'react';
import { Table } from 'reactstrap';

// 현재 날짜와 시간을 가져오기
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

function createData(num, header, writer, datetime, hits) {
  return { num, header, writer, datetime, hits };
}

const rows = [
  createData(1, '제목', '관리자', formattedDate, 0),
  createData(2, '제목2', '관리자', formattedDate, 0),
  createData(3, '제목3', '관리자', formattedDate, 0),
  createData(4, '제목4', '관리자', formattedDate, 0),
  createData(5, '제목5', '관리자', formattedDate, 0),
];

const Notilist = () => {
  return (
    <>
      <header
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          border: '0.1px solid grey',
          width: '150px',
          padding: '10px',
          textAlign: 'center',
          borderRadius: '5px',
          marginBottom: '1%',
        }}
      >
        이용 방법
      </header>
      <TableContainer component={Paper}>
        <Table
          style={{
            border: '1px solid grey',
            width: '100%',
          }}
          sx={{
            '& tr > *:not(:first-child)': {
              textAlign: 'left',
            },
          }}
        >
          <TableHead>
            <TableRow
              style={{
                width: '100px',
                border: '1px solid lightgrey',
                borderRadius: '5px',
              }}
            >
              <TableCell
                style={{
                  width: '10%',
                  padding: '1.5%',
                  fontSize: '19px',
                  marginLeft: '3%',
                  textAlign: '-webkit-center',
                  border: '1px solid lightgrey',
                }}
              >
                번호
              </TableCell>
              <TableCell
                style={{
                  width: '50%',
                  fontSize: '19px',
                  textAlign: '-webkit-center',
                }}
              >
                글 제목
              </TableCell>
              <TableCell
                style={{
                  width: '8%',
                  fontSize: '19px',
                  textAlign: '-webkit-center',
                }}
              >
                작성자
              </TableCell>
              <TableCell
                style={{
                  width: '10%',
                  fontSize: '19px',
                  textAlign: '-webkit-center',
                }}
              >
                작성일
              </TableCell>
              <TableCell
                style={{
                  width: '5%',
                  fontSize: '19px',
                  textAlign: '-webkit-center',
                }}
              >
                조회수
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.num}>
                <TableCell
                  style={{
                    padding: '1%',
                    textAlign: '-webkit-center',
                  }}
                >
                  {row.num}
                </TableCell>
                <TableCell
                  style={{
                    padding: '1%',
                    cursor: 'pointer',
                  }}
                >
                  {row.header}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: '-webkit-center',
                  }}
                >
                  {row.writer}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: '-webkit-center',
                  }}
                >
                  {row.datetime}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: '-webkit-center',
                  }}
                >
                  {row.hits}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Notilist;
