import Image, { type StaticImageData } from "next/image";

// A tidy grid of portrait photos: four across, uniform frames, a soft lift on hover.
export default function PhotoGrid({ photos }: { photos: { src: StaticImageData; alt: string }[] }) {
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <div className="photo-cell" key={photo.alt}>
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 25vw, 110px" placeholder="blur" />
        </div>
      ))}
    </div>
  );
}
