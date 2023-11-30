import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu();

  // Sort the menu items by attemptCount in descending order
  const sortedMenu = [...menu].sort((a, b) => b.attemptCount - a.attemptCount);

  // Take the top 9 items
  const popular = sortedMenu.slice(0, 9);

  return (
    <section className="mb-12">
      <SectionTitle heading="Most Attempt Constest" subHeading="Popular Contest" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-10">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
      <button className="btn btn-outline border-0 border-b-4 mt-4 text-center">
        View Full Menu
      </button>
    </section>
  );
};

export default PopularMenu;
