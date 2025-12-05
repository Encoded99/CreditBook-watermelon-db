// ArtisticSwirlLoader.tsx
import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function SwirlLoader() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dashAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Dash offset animation
    Animated.loop(
      Animated.timing(dashAnim, {
        toValue: 100,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const dashOffset = dashAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Svg width={200} height={200} viewBox="0 0 200 200">
        {/* Outer arc */}
        <Path
          d="M100 20 A80 80 0 1 1 99.9 20"
          fill="none"
          stroke="#5865F2"
          strokeWidth={8}
          strokeDasharray="10 20"
          strokeDashoffset={dashOffset as any}
        />

        {/* Middle arc */}
        <Path
          d="M100 40 A60 60 0 1 1 99.9 40"
          fill="none"
          stroke="#FE2C55"
          strokeWidth={6}
          strokeDasharray="8 16"
          strokeDashoffset={dashOffset as any}
        />

        {/* Inner arc */}
        <Path
          d="M100 65 A35 35 0 1 1 99.9 65"
          fill="none"
          stroke="#25D366"
          strokeWidth={4}
          strokeDasharray="6 12"
          strokeDashoffset={dashOffset as any}
        />
      </Svg>
    </Animated.View>
  );
}
