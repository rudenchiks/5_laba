import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js'; // импортируем компонент Filter
import { useState, useEffect } from "react";

/*
   Компонент таблицы с возможной пагинацией
   Пропсы:
     data — массив объектов
     amountRows — число строк на страницу
     showPagination — отображать ли блок с номерами страниц
*/

const Table = (props) => {
    const { data, amountRows, showPagination = true } = props;

    const [activePage, setActivePage] = useState(1); 
    const [dataTable, setDataTable] = useState(data); // данные, отображаемые в таблице

    // Обновление данных + сброс текущей страницы на первую
    const updateDataTable = (filteredData) => {
        setDataTable(filteredData);
        setActivePage(1); // сбрасываем страницу на первую при фильтрации
    };

    const totalPages = Math.ceil(dataTable.length / amountRows);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const changeActive = (event) => {
        const selectedPage = parseInt(event.target.innerHTML, 10);
        setActivePage(selectedPage);
    };

    const pages = pageNumbers.map((item) => (
        <span
            key={item}
            onClick={changeActive}
            className={`page-number ${item === activePage ? 'active' : ''}`}
            style={{ cursor: 'pointer', margin: '0 5px' }}
        >
            {item}
        </span>
    ));

    return (
        <>
            <h4>Фильтры</h4>
            <Filter 
                filtering={updateDataTable} 
                data={dataTable} 
                fullData={data} 
            />

            <table>
                <TableHead head={Object.keys(data[0])} />
                <TableBody
                    body={dataTable}
                    amountRows={amountRows}
                    numPage={activePage}
                />
            </table>

            {showPagination && totalPages > 1 && (
                <div className="pagination">{pages}</div>
            )}
        </>
    );
};

export default Table;
