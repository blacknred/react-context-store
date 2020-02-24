import * as React from "react";
import { useForm } from "../CustomHooks";
import { OrientationEnum, OrderEnum } from "../Constants/enums";
import { Filters, AllOptions, SortBy } from "../Types";

type Props = {
  setInfinite: Function;
  changeUrl: Function;
};

export default function Options({ setInfinite, changeUrl }: Props) {
  const [isInfinite, setIsInfinite] = React.useState(false);
  const [{ query }, changeFields] = useForm({ query: "" });
  const [sortBy, setSort] = React.useState<SortBy>(null);
  const [filters, setFilter] = React.useState<Filters>({
    collections: [],
    orientation: null
  });

  function deriveOptionsFromCache() {
    const rawOptions = localStorage.getItem("if_options");

    if (!rawOptions) return;

    const options: AllOptions = JSON.parse(rawOptions);

    if (options.isInfinite) {
      setIsInfinite(Boolean(options.isInfinite));
    }
    if (options.query) {
      changeFields(options.query);
    }
    if (options.collections) {
      if (options.collections && options.collections.length) {
        setFilter({ ...filters, collections: options.collections });
      }
    }
    if (options.orientation) {
      const typedOrientation = options.orientation as keyof typeof OrientationEnum;
      setFilter({ ...filters, orientation: OrientationEnum[typedOrientation] });
    }
    if (options.sortBy) {
      const typedOrder = options.sortBy as keyof typeof OrderEnum;
      setSort(OrderEnum[typedOrder]);
    }
  }

  function saveOptionsToCache() {
    const options = { isInfinite, query, ...filters, sortBy };
    localStorage.setItem("if_options", JSON.stringify(options));
  }

  React.useEffect(() => {
    deriveOptionsFromCache();

    return saveOptionsToCache;
  }, []);

  React.useEffect(() => {
    let url = "https://api.unsplash.com/search/photos?";

    if (query.length) {
      url += `&query=${query}`;
    }

    if (filters.collections) {
      url += `&collections=${filters.collections.join(",")}`;
    }

    if (filters.orientation) {
      url += `&orientation=${filters.orientation}`;
    }

    if (sortBy) {
      url += `&order_by=${sortBy}`;
    }

    // changeUrl(url);
  }, [changeUrl, query, filters, sortBy]);

  // React.useEffect(() => {
  //   console.log('here');
  //   // setInfinite(isInfinite);
  // }, [isInfinite, setInfinite]);

  return (
    <form>
      <div>
        <input
          type="checkbox"
          name="isInfinite"
          id="isInfinite"
          checked={isInfinite}
          onChange={() => setInfinite(!isInfinite)}
        />
        <label htmlFor="isInfinite">Infinite scrolling</label>
      </div>
      <br />
      <div>
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          placeholder="search by keywords"
          onChange={changeFields}
        />
      </div>
    </form>
  );
}
