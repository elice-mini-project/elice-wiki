const existError = (value) => {
  return `이 ${value}은 현재 사용중입니다. 다른 ${value}을 입력해 주세요.`;
};

const matchError = (value) => {
  return `${value}가 일치하지 않습니다. 다시 한 번 확인해 주세요.`;
};

const addError = (value) => {
  return `${value} 내역을 입력할 수 없습니다. 모든 항목을 작성했는지 확인해 주세요.`;
};

const findError = (value) => {
  return `해당하는 ${value} 내역이 없습니다. 다시 한 번 확인해 주세요.`;
};

const deleteError = (value) => {
  return `해당하는 ${value}이(가) 삭제되었습니다. 다시 한 번 확인해 주세요`;
};

const headerError =
  "headers의 Content-Type을 application/json으로 설정해주세요";

export {
  existError,
  matchError,
  addError,
  findError,
  deleteError,
  headerError,
};
