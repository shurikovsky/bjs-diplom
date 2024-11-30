logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => {
  if (response.success) {
    location.reload();
  } else {
    alert(response.error);
  }
})

ratesBoard = new RatesBoard();
setInterval(() => {ApiConnector.getStocks(data => {
  if (data.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(data.data);
  }
})
}, 60000);

ApiConnector.current(data => {
  if (data.success) {
    ProfileWidget.showProfile(data.data);
  }    
})

moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);  
    }  
    moneyManager.setMessage(response.success, 'добавлено'); 
    })
}

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);  
    }  
    moneyManager.setMessage(response.success, 'добавлено'); 
    })
}

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);  
    }  
    moneyManager.setMessage(response.success, 'добавлено'); 
    })
}

favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }    
  })

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);  
    }
  })
  moneyManager.setMessage(response.success, 'добавлено');   
}

favoritesWidget.removeUserCallback = (Id) => {
  ApiConnector.removeUserFromFavorites(Id, response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);  
      }  
    })
    moneyManager.setMessage(response.success, 'добавлено');
}
