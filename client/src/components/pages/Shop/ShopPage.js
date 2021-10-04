import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import ShopItem from './ShopItem'
import ShopService from '../../../services/shop.services'
import ProfileService from '../../../services/profile.services'


export default class ShopPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user : null,
          
        }
       this.shopService = new ShopService()
       this.profileService = new ProfileService()
    }

    componentDidMount = () => {

        this.refreshUser()

    }

    // componentDidUpdate = (prevProps, prevState) => {

    //     if (prevProps.match.params.groupId !== this.props.match.params.groupId) this.refreshImages()

    // }
    refreshUser= () => {

        this.profileService.getInfo()
        .then((user)=>{
            this.setState({
                ...this.state,
                user
            })
        })
    }

    buyShield = () =>{

        this.shopService.buyShield()
        .then(()=>{
            this.refreshUser()
        })
    }

    buyAttack = () =>{

        this.shopService.buyAttack()
    }

    render() {

        return (

             <Container className='shop_container'>

                <h1>Welcome {this.props.loggedUser?.username}</h1>
                <h3>Shields: {this.props.loggedUser?.shields} - Attacks:{this.props.loggedUser?.attacks} - Coins:{this.props.loggedUser?.coins} </h3>

                <ShopItem title="Shield" description="Adds one shield to an image or slander. You can only add a maximum of 10 shields to a particular content." image="hola" buyShield={this.buyShield}/>
                <ShopItem title="Attack" description="Reduce the shields protecting an image or a slander by one. If there are no shields, the image or slander gets destroyed." image="a" buyShield={this.buyShield} buyAttack = {this.buyAttack}/>

            </Container>
        )
    }
}


