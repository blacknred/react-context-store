# Centralized(flux) vs Decentralised(observable) stores

|                 | Flux                   | Observable                                    |
| --------------- | -----------------------| --------------------------------------------- |
| preliminarily   | -                      | Observable(get, set, subscribe)               |
| Piece of state  | reducer(data, actions) | Service(Observable(data), methods(get & set)) |
| Access in FC    | useContext|useSelector | useObservable(Service.data)                   |
