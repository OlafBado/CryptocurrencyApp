import { a } from "./app";
import { b } from "./app";
import { App } from "./app";
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

a('hello')
b('hi')

const root = document.getElementById('root')

if (root) {
    createRoot(root).render(<App title='React with TS!!!'/>)
}