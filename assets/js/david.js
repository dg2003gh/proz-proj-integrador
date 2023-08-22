function loadCards(){
  for (i=0; i<3; i++){
    addCard()
  }
  window.addEventListener("scroll", scrollMove)
}

function scrollMove(){
  // print "false" if direction is down and "true" if up
  scrUp = this.oldScroll > this.scrollY;
  this.oldScroll = this.scrollY;
  
  // Check if scroll is moving down
  if (!scrUp){
    addCard()
  }
  // Else, scroll is movin up
  else{
    remCard()
  }
}

function addCard(){
    // Get search container result
    searchContainer = document.querySelector("div#c-searching-container___result")
    // Add card
    searchContainer.innerHTML += `
    <article class="c-searching__card">
              <aside>
                <img class="c-searching-container__image" src="" alt="Establishment image" />
              </aside>
              <main class="c-searching-container__card-information">
                <header>
                  <h2>Happyness Coffee Shop</h2>
                </header>
                <main>
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Exercitationem assumenda accusantium suscipit veritatis ex,
                  ducimus, totam quas quidem inventore similique at, cumque vel
                  sunt! Nobis repellendus laborum eius et fugiat?
                  </p>
                </main>
                <footer class="c-searching-container__footer">
                  <div id="rank">
                    <span>Rank: </span>
                    <i class="ri-star-line"></i>
                    <i class="ri-star-line"></i>
                    <i class="ri-star-line"></i>
                    <i class="ri-star-line"></i>
                    <i class="ri-star-line"></i>
                  </div>
                  <div id="suport">
                    <span>Suport</span>
                    <img
                      class="acessIcon c-searching-container__icon"
                      src="/assets/imgs/accessibility_icons/Braile.svg"
                      alt="Braille icon"
                    />
                    <img
                      class="acessIcon c-searching-container__icon"
                      src="/assets/imgs/accessibility_icons/cão guia.svg"
                      alt="Guide dog icon"
                    />
                    <img
                      class="acessIcon c-searching-container__icon"
                      src="/assets/imgs/accessibility_icons/baixa visão.svg"
                      alt="Low vision icon"
                    />
                    <img
                      class="acessIcon c-searching-container__icon"
                      src="/assets/imgs/accessibility_icons/interprete libras.svg"
                      alt="Pound interpreter icon"
                    />
                  </div>
                  <div id="locality">
                    <span span>Locality: </span><span>...</span>
                  </div>
                </footer>
              </main>
      </article>`
}

function remCard(){
    // Get search container result
    searchContainer = document.querySelector("div#c-searching-container___result")
    cardList = searchContainer.querySelectorAll("article")
    // Remove the last card
    searchContainer.removeChild(cardList[cardList.length -1])
}