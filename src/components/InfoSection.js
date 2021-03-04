import React from 'react';
import Carousel from 'react-material-ui-carousel'

const InfoSection = () => {

    const styles = {
        container: {
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: "450px",
            backgroundImage: `url(${"http://www.emaseo.gob.ec/wp-content/uploads/2016/07/camion.jpg"})`
        }
    };

    function Item(props)
    {
        return (
            <div style={styles.container} elevation={3}>
                <h2>{props.item.name}</h2>
                <p>{props.item.description}</p>
            </div>
        )
    }

    const items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}
export default InfoSection;
