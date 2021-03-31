// https://codesandbox.io/s/15mko9187?file=/src/styles.scss
import { useLayoutEffect } from "react";

/** Light css theme hook */
function useCssTheme(theme: Record<string, any>) {
  useLayoutEffect(() => {
    for (const key in theme) {
      // Update css variables in document's root element
      document.documentElement.style.setProperty(`--${key}`, theme[key]);
    }
  }, [theme]);
}

export default useCssTheme;

// Usage
// import './styles.scss';

// const themes = [
//   {
//     "button-border": "none",
//     "button-padding": "16px",
//     "button-border-radius": "4px",
//     "button-font-weight": "normal",
//     "button-font-size": "14px",
//     "button-color": "#FFF",
//     "button-background": "#6772e5",
//     "button-text-transform": "uppercase",
//     "button-hover-border": "none",
//     "button-hover-color": "#fff",
//     "button-hover-background": "#7795f8",
//     "button-hover-transform": "translateY(-2px)",
//     "button-active-border": "none",
//     "button-active-color": "#e6ebf1",
//     "button-active-background": "#555abf"
//   },
//   {
//     "button-border": "none",
//     "button-padding": "20px 50px",
//     "button-border-radius": "90px",
//     "button-font-weight": "normal",
//     "button-font-size": "20px",
//     "button-color": "#FFF",
//     "button-background": "linear-gradient(to right, #DD5E89 0%, #F7BB97 80%)",
//     "button-text-transform": "normal",
//     "button-hover-border": "none",
//     "button-hover-color": "#fff",
//     "button-hover-background":
//       "linear-gradient(to right, #DD5E89 0%, #F7BB97 100%)",
//     "button-hover-transform": "scale(1.1)",
//     "button-active-border": "none",
//     "button-active-color": "#fff",
//     "button-active-background":
//       "linear-gradient(to right, #DD5E89 0%, #F7BB97 100%)"
//   },
//   {
//     "button-border": "1px solid #DDD",
//     "button-padding": "10px",
//     "button-border-radius": "0",
//     "button-font-weight": "normal",
//     "button-font-size": "14px",
//     "button-color": "#000",
//     "button-background": "#FFF",
//     "button-text-transform": "normal",
//     "button-hover-border": "1px solid #000",
//     "button-hover-color": "#000",
//     "button-hover-background": "#FFF",
//     "button-hover-transform": "none",
//     "button-active-border": "1px solid #000",
//     "button-active-color": "#000",
//     "button-active-background": "#f7f7f7"
//   }
// ];

// function App() {
//   const [themeIndex, setThemeIndex] = useState(0);
//   useTheme(themes[themeIndex]);

//   return (
//     <div className="main">
//       <button className="button">Button</button>
//       <div className="theme-changer">
//         {themes.map((theme, i) => (
//           <label key={i}>
//             <input
//               type="radio"
//               name="theme"
//               value={i}
//               checked={themeIndex === i}
//               onChange={() => setThemeIndex(i)}
//             />
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// }

// // CSS
// @mixin variable($variable, $property, $fallback) {
//   // Fallback for browsers that don't support css vars
//   #{$property}: $fallback;
//   #{$property}: var(--#{$variable});
// }

// * {
//   box-sizing: border-box;
// }

// html,
// body {
//   margin: 0;
//   font-family: Roboto, sans-serif;
// }

// .main {
//   padding: 100px;
//   text-align: center;
// }

// .theme-changer {
//   margin-top: 30px;
//   label {
//     margin: 0 12px;
//   }
// }

// .button {
//   position: relative;
//   display: inline-flex;
//   justify-content: center;
//   cursor: pointer;
//   transition: all 0.15s ease;

//   @include variable(button-border, border, none);
//   @include variable(button-padding, padding, 1rem);
//   @include variable(button-border-radius, border-radius, 0);
//   @include variable(button-font-weight, font-weight, normal);
//   @include variable(button-font-size, font-size, 1.2rem);
//   @include variable(button-text-transform, text-transform, uppercase);

//   @include variable(button-color, color, #000);
//   @include variable(button-background, background, #fff);

//   &:hover {
//     @include variable(button-hover-border, border, none);
//     @include variable(button-hover-color, color, #000);
//     @include variable(button-hover-background, background, #efefef);
//     @include variable(button-hover-transform, transform, none);
//   }

//   &:active {
//     @include variable(button-active-border, border, none);
//     @include variable(button-active-color, color, #000);
//     @include variable(button-active-background, background, #ccc);
//     @include variable(button-active-transform, transform, none);
//   }

//   &:focus {
//     // Don't do this in production for accessibility reasons
//     outline: 0;
//   }
// }
