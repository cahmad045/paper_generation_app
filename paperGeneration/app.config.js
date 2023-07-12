export default {
    expo: {
      plugins: [
        [
          'expo-build-properties',
          {
            android: {
              compileSdkVersion: 31,
              targetSdkVersion: 31,
              buildToolsVersion: '31.0.0',
            },
            ios: {
              deploymentTarget: '13.0',
            },
          },
        ],
      ],
    },
  };
  