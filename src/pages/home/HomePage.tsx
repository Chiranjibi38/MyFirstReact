import LeftSidePanel from "../../components/auth/LeftSidePanel";
import RightSidePanel from "../../components/auth/RightSidePanel";


export default function HomePage() {
    return (
        <section className="bg-black flex h-screen gap-5  rounded-md">
            <LeftSidePanel  />
          
            <RightSidePanel />
  
              </section>
    );
}
