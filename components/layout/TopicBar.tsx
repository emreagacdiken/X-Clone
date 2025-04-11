const TopicBar: React.FC<{ topics: { title: string, subtitle: string, posts: string }[] }> = ({ topics }) => {
    
    
    if (topics.length === 0) {
        return null;
    }

// Gündem olan konuları (TrendTopic) gösterir.
    return (
        <div className="fixed top-1/4 right-3 transform -translate-y-1/2 m-6">
            <div className="bg-neutral-800 rounded-xl p-7">
                <h2 className="text-white font-semibold text-xl">Neler oluyor?</h2>
                <div className="flex flex-col mt-4 gap-6">
                    {topics.map((topic, index) => (
                        <div key={index} className="flex flex-row items-center ">
                            <div className="flex flex-col">
                                <p className="text-neutral-400 text-sm">{topic.subtitle}</p>    
                                <p className="text-white font-semibold text-sm">{topic.title}</p>
                                <p className="text-neutral-400 text-sm">{topic.posts}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    );
};

export default TopicBar;