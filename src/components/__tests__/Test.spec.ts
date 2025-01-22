import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TestComponent from "../layout/LayoutFooter.vue";

describe("test", () => {
  it("renders properly", () => {
    const wrapper = mount(TestComponent);
    expect(wrapper.text()).toContain("❤️");
  });
});
