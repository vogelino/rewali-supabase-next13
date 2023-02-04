import Auth from '@/components/Auth';
import BookLoverIllustration from '@/illustrations/Book Lover_Flatline.svg'
import cn from "classnames"

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 h-[calc(100vh-300px)] items-center">
      <div className="lg:col-span-3">
        <h1 className={cn("text-6xl font-extrabold mb-4")}>Welcome!</h1>
        <p className={cn("max-w-lg mb-8")}>
          Rewali is a small app allowing you to create a reading and watching list (Rewali) and to easily search for titles without having to goolge for those informations
        </p>
        <BookLoverIllustration />
      </div>
      <div className="lg:col-span-2">
        <Auth />
      </div>
    </div>
  );
}
