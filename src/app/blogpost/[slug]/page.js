export default function blogPost({ params }) {
    return <div className="mt-20 ">
        my post : {params.slug}
    </div>
}