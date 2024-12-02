logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => {
  if (response.success) {
    location.reload();
  }
})

ratesBoard = new RatesBoard();
ApiConnector.getStocks(data => {
  if (data.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(data.data);
  }
})
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
    moneyManager.setMessage(response.success, response.error ? response.error : 'Счет пополнен'); 
    })
}

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);  
    }  
    moneyManager.setMessage(response.success, response.error ? response.error : 'Конвертация прошла успешно'); 
    })
}

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);  
    }  
    moneyManager.setMessage(response.success, response.error ? response.error : 'Средства переведены'); 
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
    favoritesWidget.setMessage(response.success, response.error ? response.error : 'добавлен новый участник'); 
  })   
}

favoritesWidget.removeUserCallback = (Id) => {
  ApiConnector.removeUserFromFavorites(Id, response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);  
    }
    favoritesWidget.setMessage(response.success, response.error ? response.error : 'участник удален');  
    })  
}
