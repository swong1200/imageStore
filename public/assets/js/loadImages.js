loadImages();
let dataArray = [];
const stripe = Stripe(
  "pk_test_51IAM5zJXFwKf0sIhgASGlu2txwoL6I5JL9duOBvRtpy3ejH5o33rn3uF231WzJYeXfVxc0E9bUIueF0WeocPXZyu00ECgtoUhT"
);

function createEl(htmlString = "", className) {
  const el = document.createElement(htmlString);
  if (className) {
    el.setAttribute("class", className);
  }
  return el;
}

function loadImages() {
  fetch("/api/images")
    .then((res) => res.json())
    .then((data) => {
      dataArray = data;
      createCards(dataArray);
    });
}

function createCards(data) {
  const container = document.getElementsByClassName("container")[0];
  container.innerHTML = "";
  let lastRow;
  const row = createEl("div", "row");

  return data.forEach(function (image, index) {
    const col = createEl("div", "col-md-4 mt-4");
    col.appendChild(createCard(image));
    if (index % 3 === 0) {
      row.appendChild(col);
      container.appendChild(row);
      lastRow = row;
    }

    return lastRow.appendChild(col);
  });
}

function createCard(image) {
  const card = createEl("div", "card");
  const imageContainer = createEl("div", "card__image-container");
  const img = createEl("img", "card-img-top card__image--cover");
  img.setAttribute("src", image.image);
  img.setAttribute("alt", image.description);

  const cardBody = createEl("div", "card-body");

  const ratingFormContainer = createEl(
    "div",
    "rating d-flex justify-content-start"
  );
  ratingFormContainer.setAttribute("data-id", image._id);
  ratingFormContainer.setAttribute("data-rating", image.rating);

  const ratingForm = createRatingForm(image);

  const cardText = createEl("p", "card-text font-weight-bold mt-2");

  cardText.innerText = `${image.description} (${image.rating})`;

  const purchaseButton = createEl("button", "btn btn-primary checkout");
  purchaseButton.innerText = `$1.00`;
  purchaseButton.setAttribute("data-price", image.amount);
  purchaseButton.setAttribute("data-name", image.description);
  purchaseButton.setAttribute("data-image", image.image);

  purchaseButton.addEventListener("click", function () {
    let price = purchaseButton.getAttribute("data-price");
    let name = purchaseButton.getAttribute("data-name");
    let image = purchaseButton.getAttribute("data-image");
    const data = { itemprice: price, itemname: name, itemimage: image };

    fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then(function (result) {
        // If redirectToCheckout fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using error.message.
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });

  imageContainer.append(img);
  ratingFormContainer.append(ratingForm);
  cardBody.appendChild(ratingFormContainer);
  cardBody.appendChild(cardText);
  cardBody.appendChild(purchaseButton);
  card.appendChild(imageContainer);
  card.appendChild(cardBody);

  return card;
}

function createRatingForm(image) {
  const labelText = {
    1: "One Star",
    2: "Two Stars",
    3: "Three Stars",
    4: "Four Stars",
    5: "Five Stars",
  };

  const form = createEl("form");
  form.setAttribute("action", "post");

  for (let i = 1; i <= 5; i++) {
    const input = createEl("input", "visuallyhidden");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "rating");
    input.setAttribute("id", `${image._id}-star-${i}`);
    input.setAttribute("value", i);

    const label = createEl("label");
    label.setAttribute("for", `${image._id}-star-${i}`);
    const labelSpan = createEl("span", "visuallyhidden");
    labelSpan.innerText = labelText[i];
    const star = createEl("i", `fa-star ${image.rating >= i ? "fas" : "far"}`);

    label.appendChild(labelSpan);
    label.appendChild(star);
    label.addEventListener("click", updateRating);
    form.appendChild(input);
    form.appendChild(label);
  }

  return form;
}

function updateRating(event) {
  const [id, , rating] = event.currentTarget.getAttribute("for").split("-");

  fetch(`/api/images/${id}`, {
    method: "PUT",
    body: JSON.stringify({ rating }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function () {
      loadImages();
    })
    .catch(function (err) {
      console.log(err);
      dataArray.forEach((item) => {
        if (item._id === id) {
          item.rating = rating;
        }
      });
      createCards(dataArray);
    });
}
