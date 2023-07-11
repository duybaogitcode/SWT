function sortArray(arr) {
  arr.sort((a, b) => a - b);

  return arr;
}

describe('sortArray', function () {
  it('should sort the array in ascending order', function () {
    const inputArray = [3, 1, 2];
    // Kết quả mong đợi
    const expectedOutput = [1, 2, 3];

    // Mock hàm sort() trong mảng
    spyOn(Array.prototype, 'sort').and.callThrough();

    // Gọi hàm sortArray với mảng đầu vào
    const result = sortArray(inputArray);

    expect(result).toEqual(expectedOutput);
    expect(Array.prototype.sort).toHaveBeenCalledTimes(1);
  });
});
