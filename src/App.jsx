import './App.css';
import React, { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { API } from './components/util/config'

function App() {

    const [data, setData] = useState([])

    const fetchData = async () => {
        const res = await axios.get(`${API}/info/StockSearch`);
        const data = res.data.map((item, index) => {
            return {
                ...item,
                id: index
            }
        })
        setData(data);
    }

    useEffect(() => {
        fetchData()
    }, [])
    const columns = [
        { field: '업종명', headerName: '업종명', width: 150, headerAlign: 'center' },
        { field: '종목명', headerName: '종목명', width: 150, headerAlign: 'center' },
        { field: '테마명', headerName: '테마명', minWidth: 700, headerAlign: 'center' },
        { field: '시가총액(억원)', headerName: '시총(억원)', width: 90, headerAlign: 'center', align: 'right', },
        { field: '유보율', headerName: '유보율', width: 80, headerAlign: 'center', align: 'right', },
        { field: '부채비율', headerName: '부채비율', width: 80, headerAlign: 'center', align: 'right', },
        {
            field: 'PER', headerName: 'PER', width: 80, headerAlign: 'center', align: 'right',
            valueFormatter: (params) => {
                if (params.value == null) {
                    return '';
                }
                else if (params.value === 0) {
                    return 0;
                }
                return `${params.value.toFixed(2)}`;
            },
        },
        {
            field: 'PBR', headerName: 'PBR', width: 80, headerAlign: 'center', align: 'right',
            valueFormatter: (params) => {
                if (params.value == null) {
                    return '';
                } else if (params.value === 0) {
                    return 0;
                }
                return `${params.value.toFixed(2)}`;
            },
        },
    ]
    return (
        <div className="App">
            <Grid container sx={{ p: 2, maxHeight: '95vh' }}>
                <DataGrid rows={data} columns={columns}
                    getRowHeight={() => 'auto'}
                    slots={{ toolbar: GridToolbar }}
                    // disableColumnFilter
                    // disableColumnSelector
                    disableDensitySelector
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                            csvOptions: { disableToolbarButton: true },
                            printOptions: { disableToolbarButton: true },
                        },
                    }}
                    sx={{
                        border: 'none',
                        '.MuiDataGrid-columnHeaders': {
                            minHeight: '30px !important',
                            maxHeight: '30px !important',
                            // lineHeight: '30px !important',
                            // backgroundColor: 'rgba(230, 230, 230, 0.1)'
                        },
                        '.MuiDataGrid-columnSeparator': { display: 'none', },
                        // '.MuiTablePagination-root': { color: '#efe9e9ed' },
                        // '.MuiTablePagination-selectLabel': { color: '#efe9e9ed', marginBottom: '5px' },
                        // '.MuiTablePagination-displayedRows': { color: '#efe9e9ed', marginBottom: '1px' },
                        '[data-field="종목명"]': { backgroundColor: '#6E6E6E', color: '#efe9e9ed', },
                    }}
                />
            </Grid>
        </div >
    );
}

export default App;
