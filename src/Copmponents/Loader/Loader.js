import React from 'react';
import './Loader.css';

const Loader = ({ width, height }) => {
    return (
        <div className='loader' style={(width && height) ? {width: width, height: height} : {width: '80px', height: '80px'} }>
            <div style={(width && height) ? {borderColor: `#f60 transparent transparent transparent`, width: width, height: height} : {borderColor: `#f60 transparent transparent transparent`, width: '80px', height: '80px'} }></div>
            <div style={(width && height) ? {borderColor: `#f60 transparent transparent transparent`, width: width, height: height} : {borderColor: `#f60 transparent transparent transparent`, width: '80px', height: '80px'} }></div>
            <div style={(width && height) ? {borderColor: `#f60 transparent transparent transparent`, width: width, height: height} : {borderColor: `#f60 transparent transparent transparent`, width: '80px', height: '80px'} }></div>
            <div style={(width && height) ? {borderColor: `#f60 transparent transparent transparent`, width: width, height: height} : {borderColor: `#f60 transparent transparent transparent`, width: '80px', height: '80px'} }></div>
        </div>
    )
}

export default Loader;