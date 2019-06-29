import React, { Component } from 'react'
import {Image} from 'react-native'
import { Card, CardItem, Text } from 'native-base'

export default class MealItem extends Component {
    render() {
        return (
          <Card style={{width: 180}}>
            <CardItem cardBody bordered>
              <Image
                source={{uri: this.props.photoUrl}}
                resizeMode="contain"
                resizeMethod="resize"
                style={{width: 180, height: 150}}
              />
            </CardItem>
            <CardItem footer>
              <Text style={{ fontSize: 12 }}>{this.props.title}</Text>
            </CardItem>
          </Card>
        );
    }
}
