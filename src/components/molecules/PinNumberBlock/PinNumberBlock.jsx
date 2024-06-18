import React from 'react';
import { Text, View } from 'react-native';

const PinNumberBlock = ({ pinNumber }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            {pinNumber !== 0 ?
                Array.from(pinNumber.toString()).map(number => {
                    return (
                        <Text style={{ color: 'black' }}>{number}</Text>
                    );
                })
                :
                <View>
                    <Text style={{ color: 'black' }}>XXXXX</Text>
                </View>
            }
        </View>
    );
};

export default PinNumberBlock;