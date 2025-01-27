import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Line } from 'react-native-svg';

function AnimatedEnvelope() {
  const [isOpen, setIsOpen] = useState(false);
  const animationValue = new Animated.Value(0);

  useEffect(() => {
    const interval = setInterval(() => {
      toggleEnvelope();
    }, 3000); 

    return () => clearInterval(interval);
  }, [isOpen]);

  const toggleEnvelope = () => {
    const toValue = isOpen ? 0 : 1; 
    Animated.timing(animationValue, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };

  const interpolate = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0], 
  });

  return (
    <View>
    <Animated.View style={{ opacity: interpolate }}>
        {!isOpen && (
        <View style={styles.close}>
        <Svg width="97" height="61" viewBox="0 0 97 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect y="0.5" width="97" height="60" fill="#FB5099" stroke="black" strokeWidth="0.5" />
            <Path d="M1 0.5L49.5 29L97.5 0.5" stroke="#004A0E"/>
        </Svg>
       

        </View>
        
        )}
    </Animated.View>
    <Animated.View style={{ opacity: interpolate }}>
        {isOpen && (
        <Svg width="111" height="90" viewBox="0 0 111 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M55.5 1.5L103.564 30H7.43559L55.5 1.5Z" fill="white" />
            <Path d="M103.5 30L55 1.5L7 30" stroke="black" />
            <Rect x="7" y="29.5" width="97" height="60" fill="#FB5099" stroke="black" strokeWidth="0.5"/>
            <Path d="M55.5 58L7.43559 29.5L103.564 29.5L55.5 58Z" fill="white" />
            <Line x1="6.99995" y1="29.75" x2="104" y2="29.7287" stroke="black" strokeWidth="0.5" />
        </Svg>
        )}
    </Animated.View>
    </View>

  );
}

export default AnimatedEnvelope;

const styles = StyleSheet.create({
    close: {
        marginTop: 30,
        marginLeft: 8,
    }
})