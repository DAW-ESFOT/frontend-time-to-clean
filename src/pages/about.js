import React from 'react';
import styles from '../styles/Home.module.css';
const About =()=>{
    return (
        <div className={styles.description}>
            <h2>¿Quienes somos?</h2>
            <p>Time2Clean nace como una idea de proyecto de Desarrollo de Aplicaciones Web en el año 2020, creada por Brenda, Carlos, Eddy y Gabriela, estudiantes de la Escuela de Formación de Tecnólogos de la EPN. La información que proporciona esta plataforma se presenta de manera intutitva para que la gestion y comunicacion entre personal del servicio y ciudadanos sea fluida y actualizada.</p>
            <h2>Visión</h2>
            <p>Al 2025, Time to clean  será reconocida por facilitar el control del servicio de aseo en Quito,
                aplicando métodos innovadores que integren a cada ciudadano  para reducir la cantidad de residuos mediante la promoción de la responsabilidad individual y corporativa.</p>
            <h2>Misión</h2>
            <p>Brindar y garantizar los servicios de aseo y recolección de residuos sólidos ordinarios en Quito, mediante la aplicación de procesos eficientes y controlados, contribuyendo a mejorar la cultura ambiental y la calidad de vida de la ciudadanía.</p>
        </div>
    );
};
export default About;