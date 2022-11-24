export const getIssuesData = async (store) => {
  try {
    const response = await fetch("/issues");

    if (response) {
      const data = await response.json();
      if (data) {
        const prevStore = store.getStore();
        store.setStore({
          ...prevStore,
          issues: data,
        });
      }
    }
  } catch (err) {
    console.error("[getIssuesData]", err);
  }
};

export const getLabelsData = async () => {
  try {
    const response = await fetch("/labels");

    if (response) {
      const data = await response.json();
      if (data) {
        return data;
      }
    }

    return [];
  } catch (err) {
    console.error("[getLabelsData]", err);
    return [];
  }
};

export const getLabelsDataDelay = async (signal, controller) => {
  try {
    const response = await fetch("/labels-delay", {
      signal,
    });

    if (response) {
      const data = await response.json();
      controller.abort();
      if (data) {
        return data;
      }
    }

    return [];
  } catch (err) {
    console.error("[getLabelsData]", err);
    return [];
  }
};

export const postLabelsData = async (data) => {
  try {
    const response = await fetch("/labels", {
      method: "POST",
      body: JSON.stringify(data)
    });

    if (!response) throw new Error('[Client] 서버 응답 없음')
    const resData = await response.json();
    
    if (!resData) throw new Error('[Client] 서버에서 데이터를 받아올 수 없음')
    if (response.status > 400) {
      alert(`서버 에러 : ${JSON.stringify(resData)}`);
      return null;
    }
    
    return resData;
  } catch (err) {
    console.error("[getLabelsData]", err);
    return null;
  }
};
