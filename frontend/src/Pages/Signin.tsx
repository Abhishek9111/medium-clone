import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";
export const Signin = () => {
  return (
    <div className="grid md:grid-cols-2">
      <Auth type="signin" />
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};
