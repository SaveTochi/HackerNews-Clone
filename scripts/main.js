const renderNewsItem = (item, index) => {
  let articleSource = item.url === null ? undefined : item.url.split("/");
  articleSource =
    articleSource === undefined
      ? ""
      : articleSource[2].includes("www.")
      ? `(${articleSource[2].substring(4)})`
      : `(${articleSource[2]})`;
  const articleSourceTag =
    articleSource !== ""
      ? `
  <span class="news-item__main-source">
      <a href="#">${articleSource}</a>
    </span>`
      : "";
  const time = moment(item.timeISO).fromNow();
  const articleTitle = item.title;
  const authorPoints = item.score;
  const authorId = item.by.id;
  const comments =
    item.descendants === 0
      ? "discuss"
      : item.descendants === 1
      ? `${item.descendants} comment`
      : `${item.descendants} comments`;
  const html = `<div class="news-item">
            <div class="news-item__main">
              <span class="news-item__main-index">${index}.</span>
              <span class="news-item__main-upvote"></span>
              <div class="news-item__main-wrapper">
              <span class="news-item__main-title"><a href="#">${articleTitle}</a></span>
              ${articleSourceTag}
              </div>
            </div>
            <div class="news-item__sub">
              <span class="news-item__sub-author-score">${authorPoints} points</span>
              <span class="news-item__sub-author"><span> by </span><a href="#">${authorId}</a></span>
              <span class="news-item__sub-time"><a href="#">${time}</a></span>
              <span class="news-item__sub-hide-details"><a href="#"> | hide | </a></span>
              <span class="news-item__sub-comment-count"><a href="#">${comments}</a></span>
            </div>
          </div>`;
  document.querySelector(".content").insertAdjacentHTML("beforeend", html);
};

const query = `{
  hn {
    topStories(limit: 30) {
      title
      url
      timeISO
      by {
        id
      }
      descendants
      score
    }
  }
}`;

fetch("https://www.graphqlhub.com/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ query })
})
  .then(res => res.json())
  .then(res =>
    res.data.hn.topStories.forEach((item, index) => {
      renderNewsItem(item, ++index);
    })
  );
