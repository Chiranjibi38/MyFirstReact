import LeftSidePanel from "../../components/auth/LeftSidePanel";
import RightSidePanel from "../../components/auth/RightSidePanel";


export default function HomePage() {
    return (
        <section className="flex h-screen gap-5 p-5  mb-0 rounded-md">
            <LeftSidePanel  />
          
            <RightSidePanel />
  
              </section>
    );
}
