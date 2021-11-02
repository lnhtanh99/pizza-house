import Title from './Title';
import Content from './Content';

function Pizza({ chosenPizza }) {
    return (
        <>
            {chosenPizza.filter(pizza => pizza.type === 'premium').length > 0 ?
                <>
                    <Title
                        smallPrice="89.000"
                        mediumPrice="169.000"
                        bigPrice="259.000"
                        type="premium"
                    />
                    <Content
                        pizzas={chosenPizza}
                        type="premium"
                    />
                </>
                : null
            }

            {chosenPizza.filter(pizza => pizza.type === 'favorite').length > 0 ?
                <>
                    <Title
                        smallPrice="69.000"
                        mediumPrice="139.000"
                        bigPrice="209.000"
                        type="favorite"
                    />
                    <Content
                        pizzas={chosenPizza}
                        type="favorite"
                    />
                </>
                : null
            }

            {chosenPizza.filter(pizza => pizza.type === 'signature').length > 0 ?
                <>
                    <Title
                        smallPrice="129.000"
                        mediumPrice="229.000"
                        bigPrice="329.000"
                        type="signature"
                    />
                    <Content
                        pizzas={chosenPizza}
                        type="signature"
                    />
                </>
                : null
            }
        </>
    )
}

export default Pizza
