import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';

export const ICLogo = ({
  width = 40,
  height = 40,
  color = defaultColors.c_0000,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 168 168" fill="none">
      <Path
        d="M153.134 81.423a2.533 2.533 0 00-1.482 4.846c-1.199 34.19-29.385 61.636-63.864 61.636a63.556 63.556 0 01-36.69-11.611c.077-.213.142-.427.2-.646.57-2.135.45-4.433.209-6.608a21.011 21.011 0 00-1.938-7 21.38 21.38 0 00-1.596-2.697 26.56 26.56 0 00-.898-1.217c-.1-.129-.948-1.004-.91-1.109a21.65 21.65 0 00-.473 1.493c-1.318 4.744-.933 10.095 1.615 14.374.231.39.48.769.747 1.136a64.254 64.254 0 01-8.195-7.791 14.69 14.69 0 002.514-4.082c2.3-5.6 1.78-12.462-1.541-17.547.074.112-1.03 1.745-1.145 1.954a35.343 35.343 0 00-1.008 1.983 30.908 30.908 0 00-1.57 4.052 16.552 16.552 0 00-.272 8.641c.19.822.47 1.621.834 2.382a64.075 64.075 0 01-6.057-9.156c.425-.56.83-1.12 1.204-1.723a19.001 19.001 0 001.947-4.075c.534-1.594.774-3.235.961-4.898.373-3.427-.373-6.87-1.58-10.063.038.102-.56.82-.636.933-.216.329-.427.66-.632.997-.411.67-.801 1.353-1.165 2.053-1.557 2.97-2.733 6.201-2.824 9.584-.016.557.004 1.114.057 1.668a62.79 62.79 0 01-2.193-5.962c.15-.384.282-.726.304-.81.211-.761.355-1.538.432-2.324.21-2.399-.086-4.815-.868-7.093a16.413 16.413 0 00-1.445-3.045c-.29-.487-.601-.961-.934-1.426a5 5 0 00-.244-.299 64.814 64.814 0 01-.127-3.968c0-35.237 28.668-63.905 63.905-63.905a63.948 63.948 0 0111.977 1.12c-.646 1.816-.261 3.983.424 5.721a9.936 9.936 0 003.173 4.232c.77.586 1.601 1.087 2.479 1.493-.03-.013.117-.881.127-.97.254-2.412.059-5.04-1.055-7.227a9.34 9.34 0 00-1.93-2.538 63.348 63.348 0 0111.424 3.983 14.37 14.37 0 00-.134.47 9.322 9.322 0 00-.187 1.544c-.02.58-.003 1.16.052 1.736.209 2.281 1.185 4.501 2.987 5.974a6.49 6.49 0 001.642.985c.081.034.969.333.971.32.336-2.364.247-4.87-.651-7.109a9.62 9.62 0 00-1.253-2.227 64.164 64.164 0 018.94 5.787c.436 1.89 1.68 3.459 3.113 4.725 1.494 1.306 3.284 2.542 5.259 3.003.38.09.767.15 1.157.177-.015 0-.142-.746-.159-.83a10.42 10.42 0 00-.201-.73 9.44 9.44 0 00-1.068-2.277c-.657-1.014-1.525-1.819-2.412-2.629a9.645 9.645 0 00-2.695-1.741 10.535 10.535 0 00-1.537-.52h-.033a62.4 62.4 0 00-4.626-3.32 17.81 17.81 0 005.302.455 14.052 14.052 0 003.373-.56 8.44 8.44 0 001.405-.578c.11-.058 1.174-.779 1.174-.779a18.727 18.727 0 00-.81-.549 11.114 11.114 0 00-6.55-1.68 10.364 10.364 0 00-5.973 2.367 65.322 65.322 0 00-9.793-4.823c.133 0 .265.011.396.013 1.65.024 3.395-.093 4.973-.601 1.049-.34 2.053-.922 2.675-1.848.028-.04-1.723-.855-1.891-.92a12.101 12.101 0 00-4.682-.775c-1.413.04-2.824.136-4.136.706a6.187 6.187 0 00-2.08 1.446c-.02.02-.116.135-.22.258a65.38 65.38 0 00-84.334 62.615c0 1.725.066 3.438.2 5.14a20.461 20.461 0 00-.667 4.567 14.291 14.291 0 003.278 9.343 66.162 66.162 0 001.738 4.98 19.488 19.488 0 00-1.58-1.992c-1.892-2.089-4.367-3.972-6.95-5.107a23.978 23.978 0 00-5.414-1.57c.116.023.526 1.68.603 1.887.241.676.51 1.341.804 1.996a18.808 18.808 0 002.171 3.672c1.805 2.348 4.348 4.091 7.094 5.185a16.798 16.798 0 005.64 1.182 65.057 65.057 0 004.348 7.418c-2.52-1.951-5.619-3.269-8.572-3.614a19.093 19.093 0 00-3.347-.084c-.306.017-3.223.474-3.257.411a15.825 15.825 0 002.613 3.733c.951.988 2.048 1.823 3.252 2.477 1.32.745 2.71 1.361 4.15 1.839 1.507.46 3.08.667 4.655.612.794-.026 1.584-.11 2.365-.254.14-.026 1.063-.263 1.658-.414a64.92 64.92 0 004.38 4.834 63.904 63.904 0 002.586 2.448 13.626 13.626 0 00-6.738-.952 66.901 66.901 0 00-9.965 1.866c.047-.013 1.34 1.473 1.505 1.613.603.513 1.263.956 1.967 1.318 1.68.87 3.547 1.307 5.414 1.493 2.501.269 5.022.317 7.532.144a9.149 9.149 0 004.853-1.732 65.377 65.377 0 0067.398 6.548 65.371 65.371 0 0037.042-56.685 2.53 2.53 0 001.862-2.442 2.53 2.53 0 00-1.862-2.443l-.011.007z"
        fill="#EA222A"
      />
      <Path
        d="M48.494 82.207c.601 0 .9.3.9.922v2.83c0 1.566-.579 2.832-1.716 3.797-1.18 1.008-2.8 1.521-4.868 1.521-2.1 0-3.729-.536-4.889-1.607-1.136-1.051-1.715-2.531-1.715-4.396v-3.86c0-1.867.578-3.346 1.715-4.397 1.137-1.05 2.79-1.603 4.89-1.603 3.238 0 5.32 1.243 6.262 3.754.193.579 0 .964-.579 1.157l-2.294.816a1.096 1.096 0 01-.73.041 1.023 1.023 0 01-.43-.621c-.363-.923-1.12-1.393-2.23-1.393-1.564 0-2.358.747-2.358 2.229V85.3c0 1.48.794 2.23 2.358 2.23s2.317-.492 2.317-1.457v-.43h-2.054c-.6 0-.9-.3-.9-.901v-1.607c0-.622.301-.922.9-.922l5.421-.006zM51.086 76.587c0-.579.28-.859.859-.859h2.531c.579 0 .857.28.857.86v13.51c0 .579-.278.857-.857.857h-2.531c-.579 0-.859-.278-.859-.857v-13.51zM71.074 90.076c.215.578 0 .879-.621.879h-2.319c-.922 0-1.458-.3-1.607-.9l-.493-1.545h-4.631l-.493 1.545c-.066.28-.225.529-.45.708-.353.15-.737.213-1.12.186h-2.247c-.601 0-.793-.3-.579-.879l4.932-13.595c.172-.494.536-.746 1.12-.746h2.445c.56 0 .922.237 1.12.709l4.943 13.638zm-6.796-7.44a11.611 11.611 0 01-.473-3.004h-.214a9.961 9.961 0 01-.407 2.986l-.793 2.532h2.68l-.793-2.515zM84.218 75.728c.6 0 .901.301.901.902v13.425c0 .599-.3.899-.901.9H81.79a.985.985 0 01-.88-.43l-3.301-5.08c-.708-1.12-1.331-2.595-1.888-4.419h-.171c.472 2.165.708 4.01.707 5.533v3.496c0 .6-.3.9-.922.9h-2.163c-.624 0-.923-.3-.923-.9V76.63c0-.601.299-.901.922-.901h2.53a1.03 1.03 0 01.901.429l3.517 5.49c.279.45.88 1.757 1.802 3.92h.171c-.644-2.082-.965-3.883-.965-5.427v-3.51c0-.602.3-.903.9-.903h2.19zM99.187 82.207c.599 0 .899.3.899.922v2.83c0 1.566-.578 2.832-1.715 3.797-1.18 1.008-2.81 1.521-4.868 1.521-2.102 0-3.732-.536-4.89-1.607-1.136-1.051-1.715-2.531-1.715-4.396v-3.86c0-1.867.58-3.346 1.716-4.397 1.137-1.05 2.787-1.603 4.889-1.603 3.238 0 5.318 1.243 6.262 3.754.192.579 0 .964-.578 1.157l-2.296.816a1.09 1.09 0 01-.728.041 1.015 1.015 0 01-.43-.621c-.364-.923-1.12-1.393-2.23-1.393-1.565 0-2.358.747-2.358 2.229V85.3c0 1.48.793 2.23 2.358 2.23 1.564 0 2.316-.492 2.316-1.457v-.43h-2.053c-.601 0-.9-.3-.9-.901v-1.607c0-.622.299-.922.9-.922l5.42-.006zM123.547 75.707c.621 0 .92.301.92.9v13.468c0 .579-.299.88-.92.88h-2.339c-.599 0-.9-.301-.9-.88v-3.067c0-1.543.321-3.408.933-5.618h-.226a20.61 20.61 0 01-1.437 3.546l-1.2 2.427a1.135 1.135 0 01-1.031.621h-1.428a1.09 1.09 0 01-1.03-.621l-1.266-2.427c-.449-.793-.879-1.973-1.329-3.546h-.214c.58 2.338.879 4.224.879 5.64v3.045c0 .579-.299.88-.922.88h-2.194c-.623 0-.933-.301-.933-.88V76.607c0-.599.301-.9.933-.9h2.015c.601 0 1.03.215 1.265.665l3.547 6.948 3.537-6.926a1.263 1.263 0 011.202-.687h2.138zM139.44 75.73c.642 0 .792.3.45.9l-4.954 8.429v4.997c0 .6-.299.9-.9.9h-2.426c-.624 0-.923-.3-.923-.9v-4.997l-4.933-8.428c-.364-.601-.213-.902.452-.902h2.572c.382-.018.765.019 1.137.109.285.15.511.39.644.685l2.294 4.375 2.359-4.375c.131-.294.357-.536.642-.685.367-.09.744-.126 1.12-.109h2.466zm-3.41-4.526a.44.44 0 01.472.297.446.446 0 01.021.198c0 .965-.17 1.68-.536 2.08-.321.364-.857.56-1.564.56a3.76 3.76 0 01-1.759-.452c-.58-.278-.944-.428-1.094-.428-.186 0-.3.15-.3.47 0 .28-.151.41-.429.41h-1.307a.441.441 0 01-.493-.495c0-1.758.684-2.638 2.053-2.638a3.865 3.865 0 011.802.452c.578.301.943.451 1.094.45.214 0 .321-.15.321-.472 0-.278.128-.43.407-.43l1.312-.002z"
        fill={color}
      />
    </Svg>
  );
};
