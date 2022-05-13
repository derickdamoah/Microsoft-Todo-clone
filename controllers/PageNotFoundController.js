export function pageNotFound(request, response){
    const url = request.url
    response.status(404).render("PageNotFoundView.ejs", {url:url})
}