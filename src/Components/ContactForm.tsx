// export function ContactForm() {
//   const [values, handleChange] = useForm({ email: "", password: "" });

//   React.useEffect(() => {
//     console.log("ContactForm mounted");

//     return () => {
//       console.log("ContactForm unmounted");
//     };
//   }, []);

//   React.useEffect(() => {
//     console.log("ContactForm password validation");
//   }, [values.password]);

//   return (
//     <form>
//       <span>
//         <input
//           type="email"
//           name="email"
//           placeholder="email"
//           onChange={handleChange}
//           value={values.email}
//         />
//       </span>
//       <span>
//         <input
//           type="password"
//           name="password"
//           placeholder="password"
//           onChange={handleChange}
//           value={values.password}
//         />
//       </span>
//     </form>
//   );
// }

// export function MousePosition() {
//   return <div>width position: {position}</div>;
// }

// export function Feed() {
//   const url = "";
//   const { data, isLoading } = useFetch(url);

//   return (
//     <div>
//       {isLoading ? (
//         <p>...loading</p>
//       ) : !data ? (
//         <p>error</p>
//       ) : (
//         data.map(post => (
//           <p style={{ textAlign: "left" }}>
//             <b>{post.title}</b>
//             <div>{post.body}</div>
//           </p>
//         ))
//       )}
//     </div>
//   );
// }