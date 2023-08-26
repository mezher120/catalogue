import React from 'react';
import './Card.css';

function Card({data}) {

  return (
    <div className='cardContainer'>
        {data.nuevo && <div className='cardNewOne'>New One</div>}
        {data.nuevo && <div className='cardOutstanding'>Destacado</div>}
        <div className='cardTitle'>
        <span>{data.nombre}</span>
        </div>
        <div className='cardImage'>
            {/* image */}
            <img height={'280px'} className='cardimg' src={data.imagen} alt='tolix'></img>
        </div>
        <div className='cardDescPriceContainer'>
            <div className='cardDescriptionContainer'>
                {/* Subtitle */} {/* Colores */}
                <span className='cardSubtitle'>{data.codigo}</span> 
                <div className='cardBorder'></div>
                {/* br */}
                <div className='cardDescription'>
                    {/* Medidas */}
                    <span>Medidas del producto: {data.descripcion}</span>
                    <span>{data.unidades} unidad</span>
                </div>
            </div>
            <div className='cardPriceContainer'>
                    {/* Precio */}
                    <span className='cardPrice'>{data.precio.toLocaleString("en-US", {style:"currency", currency:"USD"})}</span>
                    {data.descuento ? <span className='cardDiscount'>{data.descuento}%</span> : ""}
            </div>
        </div>
        <div className='cardStockContainer'>
            {/* Stock */}

            {data.stock > 10 ? <span className='cardInStock'>EN STOCK</span> : data.stock > 2  && data.stock < 10 ? <span className='cardLastStocks'>ULTIMOS EN STOCK</span> : <span className='outOfStock'>SIN STOCK</span>}
        </div>
    </div>
  )
}

export default Card