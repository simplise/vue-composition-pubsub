import { ref, reactive, watch } from '@vue/composition-api';
var defaultOptions = { useRefreshEvent: '', usePublishRequestEvent: '', synbolDescription: 'subscriber', testID: 'test' };
var isObject = function (x) { return x !== null && typeof x === 'object' && Object.prototype.toString.call(x) !== '[object Array]'; };
export default function useTopic(initialData, useOptions) {
    console.log('Topic init');
    var subscriptions = new Map();
    var options = useOptions ? Object.assign(defaultOptions, useOptions) : defaultOptions;
    var isObj = isObject(initialData(options.testID));
    var publishRequestEventTopic = options.usePublishRequestEvent ? stringEventTopic : undefined;
    var refreshEventTopic = options.useRefreshEvent ? stringEventTopic : undefined;
    var refreshEventSubscription = (options.useRefreshEvent && refreshEventTopic) ? refreshEventTopic.subscribe(options.useRefreshEvent) : undefined;
    if (refreshEventSubscription) {
        watch(refreshEventSubscription.data, function (id) {
            var data = initialData(id, true);
            publish(id, data);
        });
    }
    var publish = function (id, data) {
        var subscription = subscriptions.get(id);
        if (subscription) {
            if (isObj) {
                subscription.data.value = reactive(data);
            }
            else {
                subscription.data.value = data;
            }
        }
    };
    var subscribe = function (id) {
        var subscriber = Symbol(options.synbolDescription);
        var data;
        var subscription = subscriptions.get(id);
        if (subscription) {
            subscription.subscribers.add(subscriber);
            data = subscription.data;
        }
        else {
            if (isObj) {
                data = ref(reactive(initialData(id)));
            }
            else {
                data = ref(initialData(id));
            }
            subscriptions.set(id, { subscribers: new Set([subscriber]), data: data });
        }
        if (options.usePublishRequestEvent && publishRequestEventTopic) {
            publishRequestEventTopic.publish(options.usePublishRequestEvent, id);
        }
        return {
            id: id,
            subscriber: subscriber,
            data: data,
            unSubscribe: function () { unSubscribe(id, subscriber); }
        };
    };
    var unSubscribe = function (id, subscriber) {
        var subscription = subscriptions.get(id);
        if (subscription) {
            subscription.subscribers.delete(subscriber);
            if (subscription.subscribers.size === 0) {
                subscriptions.delete(id);
            }
        }
    };
    return {
        publish: publish,
        subscribe: subscribe
    };
}
export var stringEventTopic = useTopic(function () { return ''; });
//# sourceMappingURL=index.js.map