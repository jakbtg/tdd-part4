class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  isNormalItem(item) {
    return item.name !== "Aged Brie" && item.name !== "Backstage passes to a TAFKAL80ETC concert" && item.name !== "Sulfuras, Hand of Ragnaros";
  }

  updateNormalItemQuality(item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }

  isAgedBrie(item) {
    return item.name === "Aged Brie";
  }

  updateAgedBrieQuality(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  isBackstagePass(item) {
    return item.name === "Backstage passes to a TAFKAL80ETC concert";
  }

  updateBackstagePassQuality(item) {
    if (item.sellIn < 0) {
      item.quality = 0;
      return;
    }
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.sellIn < 11) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
      if (item.sellIn < 6) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
  }

  updateSellIn(item) {
    if (item.name !== "Sulfuras, Hand of Ragnaros") {
      item.sellIn = item.sellIn - 1;
    }
  }

  differentItemsUpdate(item) {
    if (this.isNormalItem(item)) {
      this.updateNormalItemQuality(item);
    } else {
      if (this.isAgedBrie(item)) {
        this.updateAgedBrieQuality(item);
      }
      if (this.isBackstagePass(item)) {
        this.updateBackstagePassQuality(item);
      }
    }
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.differentItemsUpdate(this.items[i]);
      this.updateSellIn(this.items[i]);
      if (this.items[i].sellIn < 0) {
        this.differentItemsUpdate(this.items[i]);
      }
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
