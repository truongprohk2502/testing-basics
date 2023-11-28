import App from "@/App";
import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";

describe("App.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  it("should render correct contents", () => {
    expect(wrapper.get("thead th").html()).to.contain("Items");
    expect(wrapper.get("form button").text()).to.equal("Add");
    expect(wrapper.html()).to.contain(
      '<span class="ui label">Remove all</span>'
    );
  });

  it("should set correct default data", () => {
    expect(wrapper.vm.item).to.equal("");
    expect(wrapper.vm.items).to.deep.equal([]);
  });

  it('should have the "Add" button disabled', () => {
    const addItemButton = wrapper.find(".ui.button");
    expect(addItemButton.element.disabled).to.be.true;
  });

  describe("the user populates the text input field", () => {
    let inputField;

    beforeEach(async () => {
      inputField = wrapper.find("input");
      inputField.element.value = "New Item";
      await inputField.trigger("input");
    });

    it('should update the "text" data property', () => {
      expect(wrapper.vm.item).to.equal("New Item");
    });

    it('should enable the "Add" button when text input is populated', () => {
      const addItemButton = wrapper.find(".ui.button");
      expect(addItemButton.element.disabled).to.be.false;
    });
  });
});
