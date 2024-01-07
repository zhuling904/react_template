/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-indent */
import React from 'react';
import Header from '@components/Header';
import style from './style/index.less';
import { add } from './index.ts';

interface IProps {
	name: string;
	age: number;
}

function App(props: IProps) {
	const { name, age } = props;
	add(1, 3);
	return (
		<div className={style.app}>
			<Header />
			<span>{`Hello! I'm ${name}, ${age} years old.`}</span>
		</div>
	);
}

export default App;
