var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });
});

describe("Tests for normal items", function () {
  it("sellIn should decrease by 1", function () {
    const gildedRose = new Shop([new Item("normal item", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
  });

  it("should decrease quality by 1 when sellIn is > 0", function () {
    const gildedRose = new Shop([new Item("normal item", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(9);
  });

  it("should decrease quality by 2 when sellIn is 0", function () {
    const gildedRose = new Shop([new Item("normal item", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });

  it("should decrease quality by 2 even when sellIn is negative", function () {
    const gildedRose = new Shop([new Item("normal item", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });

  it("quality should never be negative", function () {
    const gildedRose = new Shop([new Item("normal item", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("quality should never be negative even if sellIn is negative", function () {
    const gildedRose = new Shop([new Item("normal item", -5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("quality of one item decreases even if quality of another item is already 0", function () {
    const gildedRose = new Shop([new Item("normal item", 1, 10), new Item("normal item", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(9);
    expect(items[1].quality).to.equal(0);
  });
});

describe("Tests for Aged Brie", function () {
  it("should increase quality by 1 when sellIn is >= 0", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
  });

  it("should increase quality by 2 when sellIn is < 0", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
  });

  it("quality should never be greater than 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("quality should never be greater than 50 even if sellIn is negative", function () {
    const gildedRose = new Shop([new Item("Aged Brie", -5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });
});

describe("Tests for Sulfuras", function () {
  it("should never change quality", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
  });

  it("should never change sellIn", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(1);
  });

  it("should never change quality even if sellIn is negative", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
  });
});

describe("Tests for Backstage passes", function () {
  it("should increase quality by 1 when sellIn is > 10", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
  });

  it("should increase quality by 2 when 5 < sellIn <= 10", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 8, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
  });

  it("should increase quality by 3 when 0 < sellIn <= 5", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(13);
  });

  it("quality drops to 0 when sellIn is < 0", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("quality cannot be greater than 50 if it's already 50", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("quality cannot be greater than 50 when 0 < sellIn <= 5", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("quality cannot be greater than 50 when 5 < sellIn <= 10", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 8, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("quality cannot be greater than 50 when sellIn > 10", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("quality should increase many times when update is called many times", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
    items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(13);
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(24);
  });

  it("quality should increase many times when update is called many times and drop if sellIn becomes negative", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
    items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(15);
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    // Here the quality should drop to 0 because sellIn is negative
    expect(items[0].quality).to.equal(0);
  });
});

describe("Test Shop constructor", function () {
  it("should return an array of items", function () {
    const gildedRose = new Shop([new Item("normal item", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items).to.be.an("array");
  });

  it("with no parameters should return an empty array", function () {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items).to.be.an("array");
    expect(items.length).to.equal(0);
  });
});

describe("Test for conjured items", function () {
  it("should decrease quality by 2 when sellIn is > 0", function () {
    const gildedRose = new Shop([new Item("Conjured", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });

  it("should decrease quality by 4 when sellIn is <= 0", function () {
    const gildedRose = new Shop([new Item("Conjured", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(6);
  });

  it("quality cannot be less than 0", function () {
    const gildedRose = new Shop([new Item("Conjured", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("quality cannot be less than 0 when sellIn is <= 0", function () {
    const gildedRose = new Shop([new Item("Conjured", -1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
});
