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
});
