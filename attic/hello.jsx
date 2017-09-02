import React from 'react';
import ReactDOM from 'react-dom';
import SearchableTable from '../components/SearchableTable';
import {data} from './data';
 
// Filterable CheatSheet Component
ReactDOM.render( <SearchableTable data={data}/>, document.getElementById('searchableTable') );