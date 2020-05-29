import React, { useState } from 'react';

import { Line } from 'react-chartjs-2';

import Swal from 'sweetalert2';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { getDolarApi } from '../api/SBIF';

import './LineChart.scss';

function LineChart() {

    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Valor Dolar (CLP)',
                data: [],
                backgroundColor: '#008CBA'
            }
        ]
    });
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const changeFromDate = date => {
        setFromDate(date);
    };
    const changeToDate = date => {
        setToDate(date);
    };

    const mostrarFecha = async (from, to) => {
        const fromYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(from)
        const fromMonth = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(from)
        const fromDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(from)
        const toYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(to)
        const toMonth = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(to)
        const toDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(to)

        const result = await getDolarApi(fromYear, fromMonth, fromDay, toYear, toMonth, toDay);

        if (result.message) {
            Swal.fire(
                'Oops..',
                result.message,
                'error'
            );
        } else {
            let dataDates = [];
            let dataValues = [];
            result.Dolares.forEach(element => {
                dataDates.push(element.Fecha);
                dataValues.push(element.Valor.replace(',','.'));
            });
            setData({
                labels: dataDates,
                datasets: [
                    {
                        label: 'Valor Dolar (CLP)',
                        data: dataValues,
                        backgroundColor: '#008CBA'
                    }
                ]
            });
        }
    };

    return (
        <>
            <div className="date">
                <label>Desde: </label>
                <DatePicker selected={fromDate} onChange={changeFromDate} dateFormat="dd/MM/yyyy" />
            </div>
            <div className="date">
                <label>Hasta: </label>
                <DatePicker selected={toDate} onChange={changeToDate} dateFormat="dd/MM/yyyy" />
            </div>
            <button onClick={() => mostrarFecha(fromDate, toDate)}>
                Aceptar
            </button>
            <Line data={data} />
        </>
    )
}

export default LineChart
