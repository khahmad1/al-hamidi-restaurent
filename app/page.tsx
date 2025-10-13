import Preloader from "@/components/Preloader/Preloader";
import TopBar from "@/components/TopBar/TopBar";
import Header from "@/components/Header/Header";
import Home from "@/components/Home/Home";
import AboutUs from "@/components/About/About";
import Menu from "@/components/Menu/Menu";
import Location from "@/components/Location/Location";

export default function Page() {
  return (
    <>
      <Preloader />
      <TopBar />
      <Header />
      <main>
        <Home />
        <AboutUs />
        <Menu />
        <Location />
      </main>
    </>
  );
}
