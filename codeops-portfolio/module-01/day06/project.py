account_factory

from account_factory import AccountFactory
from notifications import AccountNotifier, EmailSubscriber, SMSSubscriber
from settings import AppSettings


settings = AppSettings()

print("Currency:", settings.currency)


notifier = AccountNotifier()

notifier.subscribe(EmailSubscriber())
notifier.subscribe(SMSSubscriber())


accounts = [
    AccountFactory.create("regular", "Eyerus", "A1", 5000),
    AccountFactory.create("savings", "Hermon", "S1", 4000),
    AccountFactory.create("current", "Haymi", "C1", 3000)
]


accounts[1].add_interest()
accounts[2].withdraw(3500)


notifier.notify("Account transaction completed")


for acc in accounts:
    acc.statement()