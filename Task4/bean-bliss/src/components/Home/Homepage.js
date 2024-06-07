import React from 'react';
import { NavLink } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
    return (
        <div>
            <header className="header">
                <h1 className="header-title">BeanBliss</h1>
                <nav>
                    <NavLink to="/login" className="header-link">Авторизуватися</NavLink>
                </nav>
            </header>
            <div className="background-image">
                <section className="container">
                    <h2>Хороша кава - як дружба</h2>
                    <p>Насолоджуйтесь насиченою, теплою та міцною кавою з наших автоматів</p>
                    <p>Отримайте максимум задоволення від улюбленої кави</p>
                    <p>Не поспішайте, насолоджуйтеся будь-якою кавою з наших автоматів</p>
                </section>
            </div>
            <section className="container">
                <h2>Статистика компанії</h2>
                <div className="statistics">
                    <div className="statistic">
                        <p>Щодня ми обсмажуємо до 500 кілограмів кави, забезпечуючи наших клієнтів свіжими та ароматними зернами.</p>
                    </div>
                    <div className="statistic">
                        <p>Завдяки власному обсмажуванню ми контролюємо кожен етап процесу виробництва, відбираючи тільки найкращі сорти кави для наших клієнтів.</p>
                    </div>
                    <div className="statistic">
                        <p>Наш асортимент включає різноманітні смаки та аромати кави, щоб задовольнити різні вподобання наших клієнтів.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Homepage;


