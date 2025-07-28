// components/About/AdoptionVideo.jsx
export const AdoptionVideo = () => {
    return (
        <section className="mt-20">
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                <iframe className="w-full h-full" width="560" height="315" src="https://www.youtube.com/embed/ABW7LR4pHnQ?si=_Q87hDu2Y3UJxGxL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </section>
    );
}
